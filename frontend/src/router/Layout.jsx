import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import { PageHeader } from "../components/common/PageHeader";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <ModalProvider>
      <div id='page-wrapper' className='w-full h-full flex flex-col flex-nowrap'>
        <header className='w-full h-[80px] fixed top-0 flex flex-col flex-nowrap items-center bg-white'>
          {isLoaded && <PageHeader />}
        </header>
        <div id='content-wrapper' className='w-full h-full mt-[80px] flex justify-center'>
          {isLoaded && <Outlet />}
        </div>
      </div>
      <Modal />
    </ModalProvider>
  );
}
