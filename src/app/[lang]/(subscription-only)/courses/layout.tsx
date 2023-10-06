import {FC, ReactNode} from 'react';
import NavAuthorized from '../../../../components/nav/authorized/NavAuthorized';

interface ILayoutProps {
    children: ReactNode;
    hello: ReactNode;
}

const Layout: FC<ILayoutProps> = ({children, hello}) => {
    return (
        <>
            <NavAuthorized />
            {children}
            {hello}
        </>
    );
};

export default Layout;
