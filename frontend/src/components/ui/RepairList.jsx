import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import Repair from './Repair';

const RepairList = ({ repairs, loading, onClickReload, onRepairDelete }) => (
  <div id="repairs">
    <h1>
      Repairs <small>
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
          <th>User</th>
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
          <td colSpan="5" />
        </tr>

      </tbody>
    </table>
  </div>
);

RepairList.propTypes = {
  repairs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onClickReload: PropTypes.func.isRequired,
  onRepairDelete: PropTypes.func.isRequired,
};

export default RepairList;
