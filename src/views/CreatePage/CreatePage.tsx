import PageContainer from "../../components/share/pageContainer/PageContainer.tsx";
import Content from "../../components/share/content/Content.tsx";
import Breadcrumb from "../../components/share/breadcrumb/Breadcrumb.tsx";
import FormTodo from "../../components/share/formTodo/FormTodo.tsx";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Create Todo",
  },
];
const CreatePage = () => {
  return (
    <PageContainer>
      <Breadcrumb title="Create Todo Page" items={BCrumb} />
      <Content title="Create Todo">
        <FormTodo />
      </Content>
    </PageContainer>
  );
};

export default CreatePage;
