import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Spinner,
} from "reactstrap";
import { GetSearchUsers } from "../redux/actions";
import UserCard from "./common/UserCard";
import Pagination from "./Pagination";

const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggleButton, setToggleButton] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [pageNo, setPageNo] = useState<any>(1);
  const [perPage, setPerPage] = useState<any>(10);
  const { users, total_count, loading, error } = useSelector((state: any) => ({
    users: state.users.items,
    total_count: state.users.total_count,
    loading: state.loading,
    error: state.error,
  }));
  const handleChange = (event: any) => {
    setSearchText(event.target.value);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (searchText) {
      dispatch(GetSearchUsers(searchText, pageNo, perPage));
      navigate({
        pathname: location.pathname,
        search: `?${createSearchParams({
          q: searchText,
          pageNo: "1",
          perPage: "10",
        })}`,
      });
    } else {
      toast.error("Can't Error blank");
    }
  };
  const search = useLocation().search;
  const querySearch = new URLSearchParams(search).get("q");
  const pageno = new URLSearchParams(search).get("pageNo");
  const perpage = new URLSearchParams(search).get("perPage");
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);
  useEffect(() => {
    if (querySearch && pageno && perpage && searchText) {
      setSearchText(querySearch);
      setPageNo(Number(pageno));
      setPerPage(Number(perpage));
      dispatch(GetSearchUsers(querySearch, Number(pageno), Number(perpage)));
    }
  }, [querySearch, pageno, perpage, dispatch]);
  useEffect(() => {
    if (searchText) {
      navigate({
        pathname: location.pathname,
        search: `?q=${searchText}&pageNo=${pageNo}&perPage=${perPage}`,
      });
    }
  }, [pageNo, perPage]);

  return (
    <Container className='mt-5'>
      <h3>Search Github User</h3>
      <Form onSubmit={handleSubmit}>
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
          <div className='d-flex justify-content-end align-items-center my-3'>
            {total_count > 0 ? (
              <>
                <Pagination
                  className='d-flex justify-content-end align-items-center'
                  currentPage={pageNo}
                  siblingCount={2}
                  totalCount={total_count}
                  pageSize={perPage}
                  onPageChange={(page: any) => setPageNo(page)}
                />
                <Dropdown
                  size='sm'
                  isOpen={toggleButton}
                  toggle={(e: any) => {
                    setPerPage(Number(e.target.innerText));
                    setToggleButton((prev) => !prev);
                  }}
                >
                  <DropdownToggle caret>{perPage}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>10</DropdownItem>
                    <DropdownItem>25</DropdownItem>
                    <DropdownItem>50</DropdownItem>
                    <DropdownItem>100</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </>
            ) : null}
          </div>
        </>
      )}
    </Container>
  );
};

export default Home;
