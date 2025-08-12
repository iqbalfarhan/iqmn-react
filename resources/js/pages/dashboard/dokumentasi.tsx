import ArticleReader from '@/components/article-reader';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';

const Dokumentasi = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/markdown.md')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gagal memuat file markdown');
        }
        return res.text();
      })
      .then((text) => {
        setContent(text);
      })
      .catch((err) => {
        console.error('Error:', err);
        setContent('Gagal memuat dokumentasi.');
      });
  }, []);

  return (
    <AppLayout title="Cara menggunakan markdown" description="Dokumentasi penggunaan aplikasi">
      <Card className="mx-auto max-w-3xl">
        <CardContent>
          <ArticleReader content={content} />
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Dokumentasi;
