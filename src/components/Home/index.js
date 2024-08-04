import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <h1 className="heading">Find The Job That Fits Your Life</h1>
      <p className="paragraph1">Millions of people are searching for jobs</p>
      <Link to="/jobs" className="button1">
        <button className="btn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)
export default Home
