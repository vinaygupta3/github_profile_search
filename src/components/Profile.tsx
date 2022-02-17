import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Row, Spinner } from "reactstrap";
import { GetUserProfile, GetUserRepos } from "../redux/actions";
import RepoCard from "./common/RepoCard";
import UserProfileCard from "./common/UserProfileCard";

const Profile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { user, repos, loading } = useSelector((state: any) => ({
    user: state.user,
    repos: state.repos,
    loading: state.loading,
  }));
  useEffect(() => {
    dispatch(GetUserProfile(userId));
    dispatch(GetUserRepos(userId));
  }, [userId, dispatch]);
  return (
    <div className='mt-5'>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to='/'>Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{userId}</BreadcrumbItem>
      </Breadcrumb>
      <h4>Github Profile Page</h4>
      {loading && (
        <div className='d-flex justify-content-center align-items-center h-200'>
          <Spinner />
        </div>
      )}
      <div className='d-flex justify-content-center align-items-center'>
        {user && <UserProfileCard {...user} />}
      </div>

      {repos.length > 0 ? (
        <Row>
          {repos.map((repo: any, index: number) => (
            <RepoCard {...repo} key={index} />
          ))}
        </Row>
      ) : (
        <div className='h-50 py-5'>
          <h5>No Public Repo Found For This User</h5>
        </div>
      )}
    </div>
  );
};

export default Profile;
