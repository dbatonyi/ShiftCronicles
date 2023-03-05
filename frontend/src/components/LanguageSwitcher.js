import Link from "next/link";
import { useRouter } from "next/router";

const LanguageSwitcher = () => {
  const router = useRouter();

  const handleLocaleChange = (locale) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <div className="flex space-x-4">
      <Link href={router.asPath} locale="en">
        <h2
          className="cursor-pointer text-lg font-medium hover:text-blue-500"
          onClick={() => handleLocaleChange("en")}
        >
          English
        </h2>
      </Link>
      <Link href={router.asPath} locale="hu">
        <h2
          className="cursor-pointer text-lg font-medium hover:text-blue-500"
          onClick={() => handleLocaleChange("hu")}
        >
          Magyar
        </h2>
      </Link>
    </div>
  );
};

export default LanguageSwitcher;
