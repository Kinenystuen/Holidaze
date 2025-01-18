import { Helmet } from "react-helmet-async";

const MetaTags = ({
  title,
  keywords,
  description
}: {
  title: string;
  keywords: string;
  description: string;
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default MetaTags;
