import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from "reactstrap";

interface Props {
  login: string;
  avatar_url: string;
  url: string;
  score: string;
}
const UserCard: React.FC<Props> = ({ login, avatar_url, url, score }) => {
  return (
    <Card style={{ width: "230px" }}>
      <Link to={login}>
        <CardBody>
          <CardImg
            alt='Card image cap'
            style={{ width: "50%" }}
            src={avatar_url}
          />
          <CardTitle tag='h5'>{login}</CardTitle>
          <CardSubtitle tag='h5'>{score}</CardSubtitle>
        </CardBody>
      </Link>
    </Card>
  );
};

export default UserCard;
