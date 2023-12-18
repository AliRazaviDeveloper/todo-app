import { Typography } from "@mui/material";
import PageContainer from "../../components/share/pageContainer/PageContainer.tsx";
import Content from "../../components/share/content/Content.tsx";
import Breadcrumb from "../../components/share/breadcrumb/Breadcrumb.tsx";
const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "HomePage",
  },
];
const HomePage = () => {
  return (
    <PageContainer>
      <Breadcrumb title="Home Page" items={BCrumb} />
      <Content title="Home Page">
        <Typography>This is a HomePage</Typography>
      </Content>
    </PageContainer>
  );
};

export default HomePage;
