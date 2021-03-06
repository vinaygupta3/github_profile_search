import React from "react";
import { Link } from "react-router-dom";
import { Card, CardTitle } from "reactstrap";

interface Props {
  name: string;
  default_branch: string;
}

const RepoCard: React.FC<Props> = ({ name, default_branch }) => {
  return (
    <Card
      body
      inverse
      style={{
        backgroundColor: "#333",
        borderColor: "#333",
        width: "220px",
        margin: "1rem",
      }}
    >
      <CardTitle tag='h5'>{name}</CardTitle>
      <Link to={`${name}/${default_branch}`}>Visit Readme.md</Link>
    </Card>
  );
};

export default RepoCard;
