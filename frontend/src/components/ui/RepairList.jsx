import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import C from '../../constants';
import { statusName } from '../../lib/misc-helpers';
import Repair from './Repair';

class RepairList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repairs: props.repairs,
    };
    this.filters = {
      user: 0,
      status: null,
      date: null,
      time: '',
      only: 0,
    };
    this.onChangeUserFilter = this.onChangeUserFilter.bind(this);
    this.onChangeStatusFilter = this.onChangeStatusFilter.bind(this);
    this.onChangeDateFilter = this.onChangeDateFilter.bind(this);
    this.onChangeTimeFilter = this.onChangeTimeFilter.bind(this);
  }

  onChangeUserFilter(e) {
    this.filters.user = parseInt(e.target.value, 10);
    this.applyFilters();
  }

  onChangeStatusFilter(e) {
    this.filters.status = JSON.parse(e.target.value);
    this.applyFilters();
  }

  onChangeDateFilter(e) {
    this.filters.date = e.target.value ? new Date(e.target.value) : null;
    this.applyFilters();
  }

  onChangeTimeFilter(e) {
    this.filters.time = e.target.value;
    this.applyFilters();
  }

  applyFilters() {
    let filteredRepairs = this.props.repairs;
    filteredRepairs = filteredRepairs.filter((r) => {
      switch (this.filters.user) {
        case -1:
          return !r.assignedUser;
        case 0:
          return true;
        default:
          return r.assignedUser &&
            r.assignedUser.id === this.filters.user;
      }
    });
    filteredRepairs = filteredRepairs.filter(r =>
      this.filters.status === null || this.filters.status === r.status,
    );
    filteredRepairs = filteredRepairs.filter(r =>
      (this.filters.date ? r.date.getTime() === this.filters.date.getTime()
        : true),
    );
    filteredRepairs = filteredRepairs.filter(r =>
      (this.filters.time ? r.time.slice(0, 2) === this.filters.time.slice(0, 2)
        : true),
    );
    this.setState({ repairs: filteredRepairs });
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
              <th>Description</th>
              <th>Date</th>
              <th>Time</th>
              {superUserView ? <th>User</th> : null }
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Filter:</th>
              <td />
              <td>
                <form className="date-filter-form">
                  <input
                    type="text"
                    onChange={this.onChangeDateFilter}
                  />
                </form>
              </td>
              <td>
                <form className="time-filter-form">
                  <input
                    type="text"
                    onChange={this.onChangeTimeFilter}
                  />
                </form>
              </td>
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
              <td>
                <form className="status-filter-form">
                  <select
                    name="status"
                    defaultValue={null}
                    onChange={this.onChangeStatusFilter}
                  >
                    <option key={-1} value="null" />
                    {[C.PENDING, C.COMPLETE, C.APPROVED].map(s =>
                      <option key={s} value={s}>{statusName(s)}</option>)
                    }
                  </select>
                </form>
              </td>
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
