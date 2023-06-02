import { doc, collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from './firebase';

const AdminPanel = ({ users, setUsers }) => {
    const handleToggleAdmin = async (userId, isAdmin) => {
        try {
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, {
                isAdmin: !isAdmin,
            });
            // Update the local state to reflect the changes
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, isAdmin: !isAdmin } : user
                )
            );
        } catch (error) {
            console.error('Error toggling admin status:', error);
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.uid}>
                        {user.username} &nbsp;
                        <label>
                            User: isAdmin &nbsp;
                            <input
                                type="checkbox"
                                checked={user.isAdmin}
                                onChange={() => handleToggleAdmin(user.id, user.isAdmin)}
                            />
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;
