import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Container, Spinner } from "reactstrap";
import { GetReposReadmeFile } from "../redux/actions";

const Readme = () => {
  const { userId, repoName, defaultBranch } = useParams<any>();

  const dispatch = useDispatch();
  const { fileData, loading } = useSelector((state: any) => ({
    fileData: state.fileData,
    loading: state.loading,
  }));

  useEffect(() => {
    dispatch(GetReposReadmeFile(userId, repoName, defaultBranch));
  }, [userId, repoName, defaultBranch, dispatch]);

  return (
    <Container className='mt-4'>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to='/'>Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={userId ? `/${userId}` : ""}>{userId}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{repoName}</BreadcrumbItem>
      </Breadcrumb>
      <div className='d-flex align-items-end'>
        <h1 className='px-2 '>{repoName}</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='text-white px-5 py-3' style={{ background: "#21262d" }}>
          <ReactMarkdown>{fileData}</ReactMarkdown>
        </div>
      )}
    </Container>
  );
};

export default Readme;
