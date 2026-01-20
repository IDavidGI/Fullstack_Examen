import Header from '@components/header';
import ClassroomForm from '@components/classroom/ClassroomForm';
import { User } from '@types';
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Classroom: React.FC = () => {
  const { t } = useTranslation();
  const [loggedInUser, setLoggedInUser] = useState<User>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
    setIsAuthorized(user && user.role === 'admin');
  }, []);

  return (
    <>
      <Head>
        <title>{t("classroom.title")}</title>
      </Head>
      <Header />
      <main className="flex flex-col items-center p-6">
        {!isAuthorized ? (
            <p className="text-red-600">{t("classroom.not-authorized")}</p>
        ) : (
          <ClassroomForm />
        )}
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default Classroom;
