import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
    const { userData, token, backendUrl } = useContext(ShopContext);
    
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            toast.error("New passwords don't match");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                backendUrl + '/api/user/change-password',
                { oldPassword, newPassword },
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return <div className="pt-16 text-center text-gray-500">Please login to view your profile.</div>;
    }

    return (
        <div className='border-t pt-16'>
            <div className='text-2xl mb-6'>
                <Title text1={'MY'} text2={'PROFILE'} />
            </div>

            <div className='flex flex-col md:flex-row gap-12'>
                
                <div className='flex-1 border p-6 rounded-md shadow-sm'>
                    <h3 className='text-xl font-medium mb-4'>Account Details</h3>
                    <div className='flex flex-col gap-3 text-gray-700'>
                        <p><span className='font-medium text-gray-900'>Name:</span> {userData?.name}</p>
                        <p><span className='font-medium text-gray-900'>Email:</span> {userData?.email}</p>
                    </div>
                </div>

                
                <div className='flex-1 border p-6 rounded-md shadow-sm'>
                    <h3 className='text-xl font-medium mb-4'>Change Password</h3>
                    <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
                        <input
                            type="password"
                            placeholder="Current Password"
                            className="w-full px-3 py-2 border border-gray-800"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full px-3 py-2 border border-gray-800"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="w-full px-3 py-2 border border-gray-800"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="bg-black text-white px-8 py-3 mt-2 font-medium hover:bg-gray-800 transition disabled:bg-gray-400"
                        >
                            {loading ? 'UPDATING...' : 'UPDATE PASSWORD'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
