import React, {useState, useEffect} from 'react';
import { Loader, Card, FormField } from '../components';
const RenderCards = ({data,title}) => {
    if (data?.length > 0) {
        return data.map((post) => <Card key = {post._id} {...post}/>)
    }

    return (
        <h2 className='mt-5 font-bold text-[#6449ff] text-xl-uppercase'>{title}</h2>
    )
};

const Home = () => {

  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect (() => {
    const fetchPosts = async () => {
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/v1/post', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            })
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

  }, []); ''
     
  return (
    <section className='max-w-7xl mx-auto'>
        <div>
            <h1 className='font-extrabold text-[#222328] text-[32px]'>
                The Community Project
            </h1>
            <p className='mt-2 text-[#666e75] text-[14px] max-w[500px]'>
                Choisissez à travers une collection d'images inspirantes et visuellement magnifiques générées par DALL-E
            </p>
        </div>

        <div className='mt-16'>
            <FormField/>
        </div>

        <div className='mt-10'>
            {loading ? (
                <div className='flex justify-center items-center'>
                    <Loader/>
                </div>
            ) : (
                <>
                {searchText && (
                    <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                        Résultats pour <span className='text-[#222328]'>{searchText}</span>
                    </h2>
                )}
                <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                    {searchText ? (
                        <RenderCards 
                            data={[]}
                            title="Pas de résultats trouvés"
                        />
                    ) : (
                        <RenderCards
                            data={allPosts}
                            title="Pas de posts trouvés"
                        />
                    )}
                </div>
                </>
            )} 
        </div>

    </section>
  )
}

export default Home