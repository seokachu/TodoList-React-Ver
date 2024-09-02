import Layout from "./components/Layout";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import TodoContainer from "./components/todos/TodoContainer";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <Layout>
      <Header />
      <QueryClientProvider client={queryClient}>
        <TodoContainer />
      </QueryClientProvider>
      <Footer />
    </Layout>
  );
};

export default App;
