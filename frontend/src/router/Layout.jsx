import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import PageHeader from "../components/common/PageHeader";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <section id='page-wrapper'>
          <header id='page-header'>
            {isLoaded && <PageHeader />}
          </header>
          <main id='page-content'>
            {isLoaded && <Outlet />}
          </main>
        </section>
        <Modal />
      </ModalProvider>
    </>
  );
}
