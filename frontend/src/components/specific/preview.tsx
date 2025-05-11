import Image from "next/image";

interface PreviewProps {
  className?: string;
  images: Record<string, string>;
  pageCount: number;
}

const Preview = ({ className, images, pageCount }: PreviewProps) => {
  if (!images || pageCount === 0) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        No preview available. Generate text to see the result.
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="relative flex flex-col gap-4 p-4">
        {Object.entries(images).map(([pageNum, base64Image]) => (
          <div key={pageNum} className="relative aspect-[1/1.414] w-full">
            <Image
              src={`data:image/png;base64,${base64Image}`}
              alt={`Page ${pageNum}`}
              fill
              className="object-contain"
            />
          </div>
        ))}
        <div className="sticky bottom-4 w-full flex items-center justify-center">
          <div className="bg-card px-4 py-1 rounded-full">Page: 1/2</div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
