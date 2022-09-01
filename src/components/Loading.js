import loading from '../assets/loading.png'
import '../css/Loading.css'

export const Loading = () => {
    return (
        <div className='Loading__container'>
            <img className="Loading" src={loading} alt='Loading...'></img>
        </div>
    );
}