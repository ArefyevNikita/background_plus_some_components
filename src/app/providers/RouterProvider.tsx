import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '~/pages/home';
import { GalleryPage } from '~/pages/gallery';
import { AboutPage } from '~/pages/about';
import { ContactPage } from '~/pages/contact';
import { ROUTES } from '~/shared/constants/routes';

export const RouterProvider: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.GALLERY} element={<GalleryPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
};
