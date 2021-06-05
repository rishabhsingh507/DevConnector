import React, { Fragment, useEffect } from 'react'
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, []);
    return <Fragment>
        {loading ? <Spinner /> : <Fragment>
            <h1 className='large text-primary'>Developers</h1>
            <p className='lead'>
                <i className="fab fa-connectdevelop">Browse and connect with developers</i>
            </p>
            <div className="profiles">
                {profiles.length > 0 ? (
                    profiles.map(profile => (
                        <ProfileItem key={profile._id} profile={profile} />
                    ))
                ) : <h4>No profiles found</h4>}
            </div>
        </Fragment>}
    </Fragment>
};

Profiles.propTypes = {
    getProfiles: propTypes.func.isRequired,
    profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(
    mapStateToProps,
    { getProfiles }
)(Profiles)
