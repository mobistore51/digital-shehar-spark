
import React from "react";
import { useParams } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { PageLoadingState } from "./dynamic-page/LoadingState";
import { PageErrorState } from "./dynamic-page/ErrorState";
import { PageContent } from "./dynamic-page/PageContent";
import { usePageData } from "@/hooks/use-page-data";
import { 
  DefaultLayout, 
  LandingLayout, 
  FullWidthLayout, 
  SidebarLayout 
} from "./dynamic-page/PageLayouts";

const DynamicPage = () => {
  const { slug } = useParams();
  const { page, loading, error } = usePageData(slug);

  if (loading) {
    return <PageLoadingState />;
  }

  if (error || !page) {
    return <PageErrorState error={error} />;
  }

  // Choose layout wrapper based on page.layout
  let ContentWrapper = DefaultLayout;

  if (page.layout === 'landing') {
    ContentWrapper = LandingLayout;
  } else if (page.layout === 'fullwidth') {
    ContentWrapper = FullWidthLayout;
  } else if (page.layout === 'sidebar') {
    ContentWrapper = SidebarLayout;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ContentWrapper>
          <PageContent page={page} />
        </ContentWrapper>
      </main>
      <Footer />
    </div>
  );
};

export default DynamicPage;
