import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../page/Home";




const RouterControl = () => {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default RouterControl;