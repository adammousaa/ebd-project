import React, { useState, useEffect } from 'react';
import { purchaseAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const PurchaseRequestsList = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    try {
      const response = await purchaseAPI.getMyPurchaseRequests();
      if (response.data.success) {
        setRequests(response.data.data);
      }
    } catch (err) {
      setError('Failed to load purchase requests');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this request?')) {
      try {
        await purchaseAPI.cancelPurchaseRequest(id);
        fetchMyRequests(); // Refresh list
      } catch (err) {
        setError('Failed to cancel request');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading your purchase requests...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Purchase Requests</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {requests.length === 0 ? (
        <div className="bg-white shadow rounded p-8 text-center">
          <p className="text-gray-600">No purchase requests found.</p>
          <a href="/purchase-request" className="text-blue-500 hover:underline mt-2 inline-block">
            Create your first purchase request
          </a>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {requests.map((request) => (
              <li key={request._id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        Request #{request._id.slice(-6)}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        <strong>Items:</strong> {request.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Total:</strong> ${request.totalAmount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Submitted:</strong> {new Date(request.requestedAt).toLocaleDateString()}
                      </p>
                      
                      {request.notes && (
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>Notes:</strong> {request.notes}
                        </p>
                      )}
                      
                      {request.status === 'rejected' && request.reasonForRejection && (
                        <p className="text-sm text-red-600 mt-1">
                          <strong>Rejection Reason:</strong> {request.reasonForRejection}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    {request.status === 'pending' && (
                      <button
                        onClick={() => handleCancel(request._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-8">
        <a
          href="/purchase-request"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          + New Purchase Request
        </a>
      </div>
    </div>
  );
};

export default PurchaseRequestsList;