import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Badge,
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Spinner,
} from "reactstrap";
import { GetSearchUsers } from "../redux/actions";
import PaginationComponent from "./common/PaginationComponent";
import UserCard from "./common/UserCard";

const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState<string>("");
  const [pageNo, setPageNo] = useState<any>(1);
  const [perPage, setPerPage] = useState<any>(10);
  const [totalPage, setTotalPages] = useState<any>(10);
  const { users, total_count, loading, error } = useSelector((state: any) => ({
    users: state.users.items,
    total_count: state.users.total_count,
    loading: state.loading,
    error: state.error,
  }));
  const handleChange = (event: any) => {
    setSearchText(event.target.value);
  };
  const handleSubmit = async () => {
    dispatch(GetSearchUsers(searchText, pageNo, perPage));
    navigate({
      pathname: location.pathname,
      search: `?${createSearchParams({
        q: searchText,
        pageNo: "1",
        perPage: "10",
      })}`,
    });
  };
  const search = useLocation().search;
  const querySearch = new URLSearchParams(search).get("q");
  const pageno = new URLSearchParams(search).get("pageNo");
  const perpage = new URLSearchParams(search).get("perPage");
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);
  useEffect(() => {
    if (querySearch && pageno && perpage) {
      setSearchText(querySearch);
      setPageNo(Number(pageno));
      setPerPage(Number(perpage));
      dispatch(GetSearchUsers(querySearch, Number(pageno), Number(perpage)));
    }
  }, [querySearch, pageno, perpage, dispatch]);
  useEffect(() => {
    const totalNoPage = Math.ceil(total_count / Number(perpage));
    setTotalPages(totalNoPage);
  }, [total_count, perpage]);
  return (
    <Container className='mt-5'>
      <h3>Search Github User</h3>
      <Form>
        <FormGroup>
          <div>
            <Input
              id='githubName'
              name='search'
              placeholder='Enter github User name'
              type='text'
              onChange={(event) => handleChange(event)}
              value={searchText}
            />
            <Button
              color='primary'
              className='mt-3'
              outline
              onClick={handleSubmit}
            >
              Search User
            </Button>
          </div>
        </FormGroup>
      </Form>
      {loading ? (
        <div className='d-flex justify-content-center align-items-center h-200'>
          <Spinner />
        </div>
      ) : (
        <>
          <Badge color='success' className='mb-3 p-2'>
            Total User Found : {total_count}
          </Badge>
          {users.length > 0 && (
            <Badge color='success' className='mb-3 p-2 mx-2'>
              No of User Shown : {users.length}
            </Badge>
          )}
        </>
      )}

      {users.length > 0 && (
        <>
          <div className='user_card'>
            {users.map((user: any, index: number) => (
              <UserCard {...user} key={index} />
            ))}
          </div>
          <div className='d-flex justify-content-end'>
            {total_count > 0 ? (
              <PaginationComponent
                pageNo={pageNo}
                perPage={perPage}
                searchText={searchText}
                totalPage={totalPage}
              />
            ) : null}
          </div>
        </>
      )}
    </Container>
  );
};

export default Home;
