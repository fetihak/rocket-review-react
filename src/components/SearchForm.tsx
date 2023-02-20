import { searchUser } from '@/utils/api';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { User } from '../types/IUser';


type SearchFormProps = {
    user: User
    setSelectedUser: (user: User) => void;
}
const SearchForm: React.FC<SearchFormProps> = ({ setSelectedUser, user}) => {
    const [query, setQuery] = useState("");

    const [userFound, setUserFound] = useState(false);

    const [userNotFound, setUseNotFound] = useState(false)

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);

    const [totalCount, setTotalCount] = useState(0);

    const [result, setResult] = useState([]);



    const handleResultClick = (result: User) => {
        setUserFound(false)
        setUserFound(true);
        setTotalCount(0)
        setSelectedUser(result) // pass data fro review form
        setQuery(result.login)
    }
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value)
        setUserFound(false);
    };

    useEffect(() => {
        if(user !== undefined){
            setLoading(true);
            setUserFound(true);
        }
        if (user) {
            setLoading(false)
            setQuery(user.login);
            setTotalCount(0)
            setResult([])
        }
    }, [user])

    useEffect(() => {
        if (query&& query.length > 0 && !userFound) {
            setLoading(true)
            const timer = setTimeout(() => {
                searchUser(query).then(resp => {
                    setTotalCount(resp.total_count)
                    if (resp.total_count === 0) {
                        setUseNotFound(true)
                    }
                    else {
                        setUseNotFound(false)
                    }
                    setError(false)
                    setLoading(false)
                    setResult(resp.items)
                }).catch(error => {
                    setLoading(false);
                    setError(true)
                });
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [query,userFound]);



    return (
        <div className="relative">
            <input
                type="text"
                className="block w-full py-2 pl-3 pr-10 text-base leading-6 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search users..."
                value={query}
                onChange={handleSearch}
            />
            {
                error && <p>
                    Error
                </p>
            }
            {
                loading && <p>
                    Loading ...
                </p>
            }
            {(totalCount > 0 && !loading) && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                    {result.map((result: User) => (
                        <div
                            key={result.id}
                            className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleResultClick(result)}
                        >
                            {result.login}
                        </div>
                    ))}
                </div>
            )}
            {userNotFound && (
                <div className="px-2 py-1 bg-red-100 text-red-800 rounded-md">No users found.</div>
            )}
        </div>
    )
}

export default SearchForm