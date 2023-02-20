import Link from 'next/link'
import React from 'react'

const Header: React.FC<{ showAddButton: boolean }> = ({ showAddButton }) => {
    return (
        <header className="text-black py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                <Link href="/" className="text-xl font-bold">
                    My Review App
                </Link>
                {showAddButton && <Link href="/review/0" 
                className="px-4 py-2 border rounded-md font-bold transition-colors">
                    Add Review
                </Link>
                }
            </div>
        </header>
    );

}

export default Header