import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import Repair from './Repair';

class RepairList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterByUser: 0,
      repairs: props.repairs,
    };
    this.onChangeUserFilter = this.onChangeUserFilter.bind(this);
  }

  onChangeUserFilter(e) {
    const value = parseInt(e.target.value, 10);
    this.setState({
      filterByUser: value,
      repairs: this.props.repairs.filter((r) => {
        switch (value) {
          case -1:
            return !r.assignedUser;
          case 0:
            return true;
          default:
            return r.assignedUser && r.assignedUser.id === value;
        }
      }),
    });
  }

  render() {
    const {
      loading, onClickReload, onRepairDelete, onMarkComplete,
      superUserView, users,
    } = this.props;
    return (
      <div id="repairs">
        <h1>
          {superUserView ? 'All' : 'My' } repairs <small>
            {
              loading ?
                'Loading...' :
                <a
                  role="button"
                  className="btn btn-default"
                  href=""
                  onClick={onClickReload}
                >Reload</a>
            }
          </small>
        </h1>
        <table className="table">
          <thead>
            <tr>
              <th />
              <th>Date</th>
              <th>Time</th>
              {superUserView ? <th>User</th> : null }
              <th>Complete</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Filter:</th>
              <td />
              <td />
              {superUserView ?
                <td>
                  <form className="username-filter-form">
                    <select
                      name="assignedUser"
                      defaultValue={null}
                      onChange={this.onChangeUserFilter}
                    >
                      <option key={0} value={0} />
                      <option key={-1} value="-1">Unassigned</option>
                      {users.map(u =>
                        <option key={u.id} value={u.id}>{u.username}</option>,
                      )}
                    </select>
                  </form>
                </td>
                :
                null
              }
              <td />
              <td />
            </tr>
            {
              this.state.repairs.map(x => (
                <Repair
                  key={x.id}
                  repair={x}
                  onRepairDelete={e => onRepairDelete(e, x.id)}
                  onMarkComplete={e => onMarkComplete(e, x.id)}
                  superUserView={superUserView}
                />),
              )
            }
            <tr className="add-repair">
              <td>
                <Link
                  to={'/repairs/0/edit'}
                  className="btn btn-default btn-add"
                  aria-label="Left Align"
                >
                  <span
                    className="glyphicon glyphicon-plus"
                    aria-hidden="true"
                  />
                </Link>
              </td>
              <td colSpan={superUserView ? 5 : 4} />
            </tr>

          </tbody>
        </table>
      </div>
    );
  }
}

RepairList.propTypes = {
  repairs: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  superUserView: PropTypes.bool.isRequired,
  onClickReload: PropTypes.func.isRequired,
  onRepairDelete: PropTypes.func.isRequired,
  onMarkComplete: PropTypes.func.isRequired,
};

export default RepairList;
