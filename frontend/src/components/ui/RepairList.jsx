import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import Repair from './Repair';

const RepairList = ({
  repairs, loading, onClickReload, onRepairDelete, onMarkComplete,
  superUserView,
}) => (
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
        {
          repairs.map(x => (
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

RepairList.propTypes = {
  repairs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  superUserView: PropTypes.bool.isRequired,
  onClickReload: PropTypes.func.isRequired,
  onRepairDelete: PropTypes.func.isRequired,
  onMarkComplete: PropTypes.func.isRequired,
};

export default RepairList;
