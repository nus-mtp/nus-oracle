import React from 'react';

export default function BasicTable() {
  return (
    <table className="tbl-typical">
      <thead>
        <tr>
          <th>
            <div>Status</div>
          </th>
          <th>
            <div>Clients</div>
          </th>
          <th>
            <div>Orders#</div>
          </th>
          <th>
            <div>Date</div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <span className="label label-primary">Paid</span>
            <span className="label label-success">Active</span>
          </td>
          <td>Adrian Chan Ee Ray</td>
          <td>3435362</td>
          <td className="color-blue-grey"><span className="semibold">Today</span> 8:30
        </td>
        </tr>
        <tr>
          <td>
            <span className="label label-primary">Paid</span>
            <span className="label label-success">Active</span>
          </td>
          <td>Antonius Satrio Triatmoko</td>
          <td>3435362</td>
          <td className="color-blue-grey"><span className="semibold">Today</span> 16:30
        </td>
        </tr>
        <tr>
          <td>
            <span className="label label-primary">Paid</span>
            <span className="label label-default">Inactive</span>
          </td>
          <td>Brandon Swee Yee</td>
          <td>3435362</td>
          <td className="color-blue-grey"><span className="semibold">Yesterday</span></td>
        </tr>
        <tr>
          <td>
            <span className="label label-default">Unpaid</span>
            <span className="label label-default">Inactive</span>
          </td>
          <td>Natasha Koh</td>
          <td>3435362</td>
          <td className="color-blue-grey">23th May</td>
        </tr>
        <tr>
          <td>
            <span className="label label-primary">Paid</span>
            <span className="label label-success">Active</span>
          </td>
          <td>See Wenhan</td>
          <td>3435362</td>
          <td className="color-blue-grey">
            <span className="semibold">Today</span> 8:30
          </td>
        </tr>
      </tbody>
    </table>
  );
}
