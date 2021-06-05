import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Experience from './Experience';
import Eductaion from './Education';
import DashboardActions from './DashboardActions';

const Dashboard = ({
    getCurrentProfile,
    deleteAccount,
    auth: { user },
    profile: { profile, loading }
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
        {profile !== null ? (
            <Fragment>
                <DashboardActions />
                <Experience experience={profile.experience} />
                <Eductaion education={profile.education} />
                <div className="my-2">
                    <button className="btn btn-danger" onClick={() => deleteAccount()}>
                        <i className="fas fa-user-minus"></i> Delete My Account
                    </button>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <p>You have not yet setup ypur profile, please add some info</p>
                <Link to='/create-profile' className='btn btn-primary my-1'>
                    Create Profile
                    </Link>
            </Fragment>
        )}
    </Fragment>;
};

Dashboard.propTypes = {
    getCurrentProfile: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
    getCurrentProfile: propTypes.func.isRequired,
    deleteAccount: propTypes.func.isRequired,
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
