
import { HiUser, HiHome } from 'react-icons/hi'
import { IoLogOut } from 'react-icons/io5'
import { TbPlaylistAdd } from 'react-icons/tb'
import { MdFeaturedPlayList, MdRadio, MdOndemandVideo } from 'react-icons/md'

const useIcon = (iconName: string) => {
    switch (iconName) {
        case 'Home':
            return <HiHome />;
        case 'Collections' :
            return <TbPlaylistAdd />
        case 'Radio':
            return <MdRadio />
        case 'Videos': 
            return <MdOndemandVideo />
        case 'Profile':
            return <HiUser />
        case 'Logout':
            return <IoLogOut />
        default :
            return <></>;
    }
}

export default useIcon