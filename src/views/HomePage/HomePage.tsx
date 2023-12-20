import PageContainer from "../../components/share/pageContainer/PageContainer.tsx";
import Content from "../../components/share/content/Content.tsx";
import Breadcrumb from "../../components/share/breadcrumb/Breadcrumb.tsx";
import { Button } from "@mui/material";
import MuiTable from "../../components/ui/table/Table.tsx";
import { useNavigate } from "react-router-dom";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "TodoList",
  },
];
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <Breadcrumb title="Todo List Page" items={BCrumb} />
      <Content
        title="Todo List Page"
        action={<Button onClick={() => navigate("/create")}>Add Todo</Button>}
      >
        <MuiTable />
      </Content>
    </PageContainer>
  );
};

export default HomePage;
