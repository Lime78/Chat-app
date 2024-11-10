import { Outlet } from 'react-router-dom'

const Root: React.FC = () => {
  return (
    <div className="app">
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Root