
import React from "react";
import { usePageEditor } from "@/hooks/use-page-editor";
import { PageForm } from "@/components/page-editor/PageForm";
import { ContentBlocks } from "@/components/page-editor/ContentBlocks";
import { PageEditorHeader } from "@/components/page-editor/PageEditorHeader";
import { LoadingState } from "@/components/page-editor/LoadingState";

const PageEditor = () => {
  const {
    isEditing,
    loading,
    saving,
    page,
    showPreview,
    setShowPreview,
    handleInputChange,
    handleSubmit,
    addContentBlock,
    removeBlock,
    updateBlockContent,
    moveBlock,
    setPage,
    navigate
  } = usePageEditor();

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      <PageEditorHeader 
        isEditing={isEditing}
        showPreview={showPreview}
        saving={saving}
        onBack={() => navigate('/dashboard/pages')}
        onTogglePreview={() => setShowPreview(!showPreview)}
        onSave={handleSubmit}
      />

      {/* Page Details */}
      <PageForm 
        page={page} 
        handleInputChange={handleInputChange} 
        setPage={setPage} 
      />

      {/* Page Content Builder */}
      <ContentBlocks 
        blocks={page.content_blocks}
        showPreview={showPreview}
        addContentBlock={addContentBlock}
        updateBlockContent={updateBlockContent}
        moveBlock={moveBlock}
        removeBlock={removeBlock}
      />
    </div>
  );
};

export default PageEditor;
