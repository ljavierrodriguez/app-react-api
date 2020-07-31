import React, { useContext } from 'react';
import Navbar from '../components/navbar';
import { Context } from '../store/appContext';

const UpdateProfile = props => {
    const {store, actions} = useContext(Context);
    return (
        <>
            <Navbar />
            <h1>UpdateProfile</h1>

            <form onSubmit={actions.handleUpdateProfile}>
                <input type="file" name="avatar" id="avatar" onChange={actions.handleFile}/>
                <button className="btn btn-primary btn-block">Update</button>
            </form>
        </>
    )
}

export default UpdateProfile;