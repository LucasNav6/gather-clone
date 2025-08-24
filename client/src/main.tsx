import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./main.css"
import { Toaster } from 'sonner'
import AuthentificationPage from './authentification/pages/authentification.page'
import { RoomListPage } from './rooms/pages/room-list.page'
import { RoomsLayout } from './rooms/layout/rooms.layout'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthentificationPage />} />
      <Route path="/rooms" element={<RoomsLayout><RoomListPage /></RoomsLayout>} />
      <Route path="/room/:id" element={<p>Room space</p>} />
    </Routes>
    <Toaster richColors />
  </BrowserRouter>
)
