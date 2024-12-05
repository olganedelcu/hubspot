import React, { useEffect, useState } from "react";
import axios from "axios";

interface Contact {
  vid: number;
  properties: {
    firstname?: { value: string };
    lastname?: { value: string };
  };
}

const Dashboard: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const accessToken = localStorage.getItem("hubspot_access_token");

      if (!accessToken) {
        setError("No access token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://api.hubapi.com/contacts/v1/lists/all/contacts/all",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setContacts(response.data.contacts);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError("Failed to fetch contacts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleAddContact = async () => {
    // Logic to add a new contact
    // You can create a form to collect contact details and send a POST request to HubSpot API
  };

  if (loading) {
    return <div>Loading contacts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleAddContact}>Add New Contact</button>
      <h2>Your Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.vid}>
            {contact.properties.firstname?.value}{" "}
            {contact.properties.lastname?.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
