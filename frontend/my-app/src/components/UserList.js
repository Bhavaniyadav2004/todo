import React from 'react';
import { useGetUsersQuery, useDeleteUserMutation } from '../api/userApi';

function UserList() {
    // Fetch all users using the auto-generated hook from RTK Query
    const { data: users, isLoading, isError, refetch } = useGetUsersQuery();

    // Mutation hook to delete a user
    const [deleteUser] = useDeleteUserMutation();

    // Handle user deletion
    const handleDelete = async (id) => {
        try {
            await deleteUser(id).unwrap();
            refetch();  // Refresh user list after deletion
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert('Failed to delete user. Please try again.');
        }
    };

    if (isLoading) {
        return <p>Loading users...</p>;
    }

    if (isError) {
        return <p>Error loading users.</p>;
    }

    return (
        <div style={styles.container}>
            <h2>User List</h2>
            <ul style={styles.list}>
                {users?.map((user) => (
                    <li key={user.id} style={styles.listItem}>
                        <span>{user.name} ({user.email})</span>
                        <button 
                            onClick={() => handleDelete(user.id)} 
                            style={styles.deleteButton}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Inline styles
const styles = {
    container: {
        width: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    }
};

export default UserList;
