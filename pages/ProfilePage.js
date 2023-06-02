import React, { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from '../src/firebase';
import { useParams } from 'react-router-dom'; // Import useParams for dynamic routing

const db = getFirestore(firebaseConfig);
const auth = getAuth(firebaseConfig);

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Access the username from the URL using useParams
    const { username } = useParams();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const currentUser = auth.currentUser;
                if (currentUser) {
                    const userId = currentUser.uid;
                    const userRef = doc(db, 'users', userId);
                    const userSnapshot = await getDoc(userRef);
                    if (userSnapshot.exists()) {
                        const userData = userSnapshot.data();
                        setUserProfile(userData);
                        if (userData.isAdmin) {
                            const usersCollection = collection(db, 'users');
                            const usersSnapshot = await getDocs(usersCollection);
                            const usersData = usersSnapshot.docs.map((doc) => ({ userId: doc.id, ...doc.data() }));
                            setUsers(usersData);
                        }
                    } else {
                        // User document does not exist
                        console.log('User document does not exist');
                        setUserProfile(null); // Reset the userProfile state to null
                    }
                } else {
                    // No user is currently signed in
                    console.log('No user is currently signed in');
                    setUserProfile(null); // Reset the userProfile state to null
                }
            } catch (error) {
                // Handle error
                console.error('Error fetching user profile:', error);
                setUserProfile(null); // Reset the userProfile state to null
            } finally {
                setLoading(false);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserProfile();
            } else {
                // No user is currently signed in
                console.log('No user is currently signed in');
                setUserProfile(null); // Reset the userProfile state to null
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!loading && !userProfile) {
        return <p>User profile not found.</p>;
    }

    const isAdmin = userProfile.isAdmin;

    const handleAttendanceChange = (userId, index, field, value) => {
        setUsers((prevUsers) => {
            const updatedUsers = prevUsers.map((user) => {
                if (user.userId === userId) {
                    const updatedAttendance = user.attendance.map((attendanceItem, i) => {
                        if (i === index) {
                            return { ...attendanceItem, [field]: value };
                        }
                        return attendanceItem;
                    });
                    return { ...user, attendance: updatedAttendance };
                }
                return user;
            });
            return updatedUsers;
        });
    };

    const handleSaveChanges = async () => {
        try {
            for (const user of users) {
                const userRef = doc(db, 'users', user.userId);
                await setDoc(userRef, { attendance: user.attendance }, { merge: true });

                if (user.userId === userProfile.userId) {
                    // Update the userProfile state for the current user
                    const userSnapshot = await getDoc(userRef);
                    if (userSnapshot.exists()) {
                        const userData = userSnapshot.data();
                        setUserProfile(userData);
                    }
                }
            }

            console.log('Changes saved successfully.');

            // Fetch the updated user data for all users
            const usersCollection = collection(db, 'users');
            const usersSnapshot = await getDocs(usersCollection);
            const updatedUsersData = usersSnapshot.docs.map((doc) => ({ userId: doc.id, ...doc.data() }));
            setUsers(updatedUsersData);
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            <p>Username: {userProfile.username}</p>
            <p>Email: {userProfile.email}</p>
            {/* Display other profile information as needed */}
            {isAdmin && (
                <div>
                    <h3>All Users</h3>
                    {users.map((user) => (
                        <div key={user.userId}>
                            <h4>{user.username}</h4>
                            <table>
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Course</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {user.attendance.map((attendanceItem, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="text"
                                                value={attendanceItem.date}
                                                onChange={(e) => handleAttendanceChange(user.userId, index, 'date', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={attendanceItem.course}
                                                onChange={(e) => handleAttendanceChange(user.userId, index, 'course', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={attendanceItem.status}
                                                onChange={(e) => handleAttendanceChange(user.userId, index, 'status', e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                    <button onClick={handleSaveChanges}>Save Changes</button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
