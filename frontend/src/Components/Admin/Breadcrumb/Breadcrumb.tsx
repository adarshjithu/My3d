interface BreadcrumbProps {
  pageName: string;
  root?: string;
}

const Breadcrumb = ({ pageName, root }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="md:text-[25px] text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h1>

      <nav>
        <ol className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <li>
            <button className="font-medium hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              {root} /
            </button>
          </li>
          <li className="font-medium text-primary dark:text-primary-light">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
