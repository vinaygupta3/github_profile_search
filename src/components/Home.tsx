import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { GetSearchUsers } from "../redux/actions";
import UserCard from "./common/UserCard";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState<string>("");
  const { users, total_count, loading } = useSelector((state: any) => ({
    users: state.users.items,
    total_count: state.users.total_count,
    loading: state.loading,
  }));
  const handleChange = (event: any) => {
    setSearchText(event.target.value);
  };
  const handleSubmit = async () => {
    dispatch(GetSearchUsers(searchText));
  };
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
      ) : users.length > 0 ? (
        <Badge color='success' className='mb-3 p-2'>
          Total User Found : {total_count}
        </Badge>
      ) : null}

      <div className='user_card'>
        {users.length > 0
          ? users.map((user: any, index: number) => (
              <UserCard {...user} key={index} />
            ))
          : ""}
      </div>
    </Container>
  );
};

export default Home;
