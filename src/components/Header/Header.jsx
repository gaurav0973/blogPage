import React from 'react'
import {Container, Logo, LogoutBtn} from "../index"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {

  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name : "Home",
      slug : "/",
      active : true
    },
    {
      name : "Login",
      slug : "/login",
      active : !authStatus
    },
    {
      name : "Signup",
      slug : "/signup",
      active : !authStatus
    },
    {
      name : "All Posts",
      slug : "/all-post",
      active : authStatus
    },
    {
      name : "Add Posts",
      slug : "//add-posts",
      active : authStatus
    },
    {
      name : "Login",
      slug : "/login",
      active : authStatus
    }
  ]


  return (
    <header className='py-3 shadow bg-grey-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* looping over the array */}
          <ul className='flex ml-auto'>
            {
              navItems.map((item) =>item.active ?
                (
                  <li key={item.name}>
                    <button onClick={() => navigate(item.slug)}
                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                      {item.name}
                    </button>
              </li>
                )
                : null )
            }
          </ul>
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Header
