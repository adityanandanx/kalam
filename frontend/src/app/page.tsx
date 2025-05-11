"use client";
import Controls from "@/components/specific/controls";
import Preview from "@/components/specific/preview";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sliders } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [previewData, setPreviewData] = useState<{
    images: Record<string, string>;
    page_count: number;
  } | null>(null);

  return (
    <main className="">
      <div className="h-full overflow-hidden">
        {/* Desktop Layout */}
        <div className="hidden h-full lg:block">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
              <div className="flex h-full flex-col">
                <Controls onGenerate={setPreviewData} />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={70} minSize={20}>
              <div className="flex h-full flex-col">
                <div className="flex h-screen overflow-y-auto flex-col">
                  <Preview
                    images={previewData?.images ?? {}}
                    pageCount={previewData?.page_count ?? 0}
                  />
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile Layout */}
        <div className="h-full lg:hidden">
          <Tabs defaultValue="controls" className="h-full">
            <TabsList className="w-full rounded-none">
              <TabsTrigger value="controls" className="flex-1">
                <Sliders className="mr-2 h-4 w-4" />
                Controls
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex-1">
                Preview
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="controls"
              className="mt-0 h-[calc(100%-2.5rem)]"
            >
              <div className="flex h-full flex-col">
                <Controls className="flex-1" onGenerate={setPreviewData} />
              </div>
            </TabsContent>
            <TabsContent value="preview" className="mt-0 h-[calc(100%-2.5rem)]">
              <div className="flex h-full flex-col">
                <Preview
                  images={previewData?.images ?? {}}
                  pageCount={previewData?.page_count ?? 0}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
