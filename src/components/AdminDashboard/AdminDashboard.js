import React, { useState, useEffect } from 'react';

import './AdminDashboard.css';

import AddIncident from './AddIncident';
import DashboardTop from './DashboardTop';
import Welcome from './Welcome';
import useOktaAxios from '../../hooks/useOktaAxios';
import StatusSelector from './StatusSelector';
import AntTable from './AntTableComponents/AntTable';
import {
  putIncidents,
  getLatAndLong,
  getApprovedIncidents,
  getPendingIncidents,
  getFormResponses,
} from '../../utils/DashboardHelperFunctions.js';
import ListSelector from './ListSelector';


const AdminDashboard = () => {
  /** List of selected (checked) incident_ids */
  const [selectedIds, setSelectedIds] = useState([]);

  // The three categories of incidents
  const [formResponses, setFormResponses] = useState([]);
  const [pendingIncidents, setPendingIncidents] = useState([]);
  const [approvedIncidents, setApprovedIncidents] = useState([]);

  // The incident tab to display: 'pending', 'approved', 'form-responses'
  const [listType, setListType] = useState('pending');

  // returns the corrent incidents array for the current tab
  const getCurrentList = () => {
    switch (listType) {
      case 'pending':
        return pendingIncidents;
      case 'approved':
        return approvedIncidents;
      case 'form-responses':
        return formResponses;
      default:
        return [];
    }
  };

  // resets the selected incidents when switching tabs
  useEffect(() => {
    setSelectedIds([]);
  }, [listType]);

  // toggles whether or not the addIncident popup is displayed
  const [adding, setAdding] = useState(false);

  // toggling rendering of AddIncident pop up modal
  const toggleAddIncident = evt => {
    evt.preventDefault();
    setAdding(true);
  };

  // authorized axios
  const oktaAxios = useOktaAxios();

  // downloads all incident data
  const fetchIncidents = () => {
    getApprovedIncidents(oktaAxios)
      .then(setApprovedIncidents)
      .catch(console.log);

    getPendingIncidents(oktaAxios)
      .then(setPendingIncidents)
      .catch(console.log);

    getFormResponses(oktaAxios)
      .then(setFormResponses)
      .catch(console.log);
  };

  // loads incident data on first render
  useEffect(() => {
    fetchIncidents();
  }, []);

  // approves or rejects the selected incidents
  const approveAndRejectHandler = async (newStatus) => {
    const currentList = getCurrentList();
    const selected = currentList.filter(inc => selectedIds.includes(inc.incident_id));

    // setting lat and long for approved incidents
    if (newStatus === 'approved') {
      for (const inc of selected) {
        if (inc.city && inc.state) {
          try {
            const latAndLong = await getLatAndLong(inc);
            inc.lat = latAndLong[0];
            inc.long = latAndLong[1];
          } catch (err) {
            console.log(err);
          }
        }
      }
    }

    putIncidents(oktaAxios, selected, newStatus)
      .then(res => {
        setSelectedIds([]);
        fetchIncidents();
      })
      .catch(err => {
        console.log(err);
        // TODO: Better error handling!
      });
  };

  return (
    <>
      {/* Welcome message */}
      <Welcome pendingCount={pendingIncidents.length} />

      {/* Incident "tabs" - unapproved, approved, form responses */}
      <ListSelector listType={listType} setListType={setListType} />

      <div className="dashboard-container">
        <DashboardTop
          unapprovedIncidents={pendingIncidents}
          toggleAddIncident={toggleAddIncident}
          listType={listType}
        />

        {selectedIds.length > 0 &&
          <span>{selectedIds.length} selected</span>
        }

        {/* Controls for setting the status of selected incidents (unapproved, pending, approved) */}
        <StatusSelector
          isVisible={selectedIds.length > 0}
          listType={listType}
          onStatusConfirm={approveAndRejectHandler}
        />

        {/* modal popup for adding a new incident */}
        {adding &&
          <AddIncident
            setAdding={setAdding}
          />
        }

        {/* Table for pending incidents */}
        {listType === 'pending' &&
          <AntTable
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            incidents={pendingIncidents}
            showConfidence={true}
          />
        }

        {/* Table for approved incidents */}
        {listType === 'approved' &&
          <AntTable
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            incidents={approvedIncidents}
          />
        }

        {/* table for form-responses */}
        {listType === 'form-responses' &&
          <AntTable
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            incidents={formResponses}
          />
        }

      </div>
    </>
  );
};
export default AdminDashboard;
