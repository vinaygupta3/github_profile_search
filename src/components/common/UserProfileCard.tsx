import React from "react";
import { Card, CardBody, CardImg, CardSubtitle } from "reactstrap";

interface Props {
  name: string;
  location: string;
  login: string;
  public_repos: string;
  company: string;
  bio: string;
  avatar_url: string;
}
const UserProfileCard: React.FC<Props> = ({
  name,
  location,
  login,
  public_repos,
  company,
  bio,
  avatar_url,
}) => {
  return (
    <Card style={{ maxHeight: "350px", maxWidth: "700px" }}>
      <CardBody>
        <div className='d-flex flex-row justify-content-center '>
          <CardImg
            alt='Card image cap'
            src={avatar_url}
            className='mx-5'
            style={{ width: "50%", maxHeight: "300px", maxWidth: "250px" }}
          />
          <CardSubtitle className='mb-2 text-muted ' tag='h6'>
            <p className='fs-2'>Name: {name ? name : "N/A"}</p>
            <p className='fs-6'>Location: {location ? location : "N/A"}</p>
            <p className='fs-6'>UserName:{login ? login : "N/A"}</p>
            <p className='fs-6'>
              Public RepoCount: {public_repos ? public_repos : 0}
            </p>
            <p className='fs-6'>Company: {company ? company : "N/A"}</p>
            <p className='fs-6'>Bio: {bio ? bio : "N/A"}</p>
          </CardSubtitle>
        </div>
      </CardBody>
    </Card>
  );
};

export default UserProfileCard;
