import Head from "next/head";
import Link from "next/link";
import { getAllDocPaths, getDocData, getDocStructure } from "../../lib/docs";

export async function getStaticPaths() {
  const paths = getAllDocPaths();
  console.log('Generated paths:', paths); // Debug logging
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  try {
    const docData = await getDocData(params.slug);
    const structure = getDocStructure();
    return {
      props: {
        docData,
        structure,
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
    };
  }
}

function DocNavigation({ structure, currentPath = [] }) {
  const renderNavItem = (key, value, level = 0) => {
    if (typeof value === 'string') {
      // It's a file
      const href = `/docs/${value}`;
      const isActive = currentPath.join('/') === value;
      return (
        <li key={key} className={`ml-${level * 4}`}>
          <Link 
            href={href}
            className={`block py-1 px-2 text-sm rounded ${
              isActive 
                ? 'bg-blue-100 text-blue-800 font-medium' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            {key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </Link>
        </li>
      );
    } else {
      // It's a directory
      return (
        <li key={key} className={`ml-${level * 4}`}>
          <div className="font-medium text-gray-800 py-1 px-2 text-sm">
            {key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
          <ul className="mt-1">
            {Object.entries(value).map(([subKey, subValue]) => 
              renderNavItem(subKey, subValue, level + 1)
            )}
          </ul>
        </li>
      );
    }
  };

  return (
    <nav className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto p-4">
      <Link href="/" className="text-lg font-bold text-blue-600 block mb-6">
        Wamia Docs
      </Link>
      <ul className="space-y-1">
        {Object.entries(structure).map(([key, value]) => 
          renderNavItem(key, value)
        )}
      </ul>
    </nav>
  );
}

export default function DocPage({ docData, structure }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Head>
        <title>{docData.title || "Documentation"} - Wamia Magento Docs</title>
        <meta name="description" content={docData.description || "Wamia Magento Documentation"} />
      </Head>
      
      <DocNavigation structure={structure} currentPath={docData.slug} />
      
      <main className="flex-1 max-w-4xl mx-auto py-8 px-6">
        <article className="prose prose-lg max-w-none">
          {docData.title && (
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {docData.title}
              </h1>
              {docData.description && (
                <p className="text-xl text-gray-600">{docData.description}</p>
              )}
            </header>
          )}
          <div 
            className="prose-headings:text-gray-900 prose-a:text-blue-600 prose-code:text-pink-600 prose-pre:bg-gray-900"
            dangerouslySetInnerHTML={{ __html: docData.contentHtml }} 
          />
        </article>
      </main>
    </div>
  );
}
