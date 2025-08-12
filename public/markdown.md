# Panduan Dasar Menggunakan Markdown

**Markdown** adalah bahasa markup ringan yang digunakan untuk memformat teks. Markdown sering dipakai dalam file README, dokumentasi, blog, atau konten berbasis teks lainnya karena sintaksnya yang simpel dan mudah dibaca.

---

## 📌 Heading

Gunakan tanda pagar `#` untuk membuat heading. Jumlah `#` menentukan level heading-nya:

```
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
```

---

## 📝 Penulisan Teks

### **Tebal**

```markdown
**teks tebal**
```

Hasil: **teks tebal**

### _Miring_

```markdown
_teks miring_
```

Hasil: _teks miring_

### ~~Coret~~

```markdown
~~teks dicoret~~
```

Hasil: ~~teks dicoret~~

---

## 🔗 Link

```markdown
[Teks Link](https://google.com)
```

Hasil: [Teks Link](https://google.com)

---

## 🖼️ Gambar

```markdown
![Contoh Logo](https://api.dicebear.com/9.x/dylan/png?seed=Administrator)
```

Hasil : ![Contoh Logo](https://api.dicebear.com/9.x/dylan/png?seed=Administrator)

---

## 📄 Table

Untuk membuat table di markdown, anda membutuhkan garis `|` sebagai pemisah kolom dan `-` untuk pemisah baris header.

```markdown
| Kolom 1 | Kolom 2 | Kolom 3 |
| ------- | ------- | ------- |
| Data 1  | Data 2  | Data 3  |
| Data 4  | Data 5  | Data 6  |
```

Hasil :

| Nama  | Umur | Asal Kota  |
| ----- | ---- | ---------- |
| Iqbal | 25   | Bandung    |
| Rani  | 23   | Yogyakarta |
| Dimas | 27   | Surabaya   |

---

## 📋 List

### Unordered List (List tanpa urutan)

```markdown
- Item 1
- Item 2
  - Sub-item 2a
  - Sub-item 2b
```

### Ordered List (List berurutan)

```markdown
1. Langkah pertama
2. Langkah kedua
3. Langkah ketiga
```

---

## 📦 Code

### Inline code

```markdown
Contoh `kode inline`
```

Hasil: Contoh `kode inline`

### Code block (dengan highlight bahasa)

Gunakan tiga backtick \`\`\` content code \`\`\`\` untuk membuat blok kode:

````markdown
```markdown
console.log('Hello, Markdown!');
```
````

Hasil:

```javascript
console.log('Hello, Markdown!');
```

---

## 📑 Quote / Kutipan

```markdown
> Ini adalah kutipan atau quote.
```

Hasil:

> Ini adalah kutipan atau quote.

---

## 📏 Garis Pembatas

```markdown
---
```

---

## 📋 Checklist (to-do list)

```markdown
- [x] Tugas selesai
- [ ] Tugas belum selesai
```

Hasil:

- [x] Tugas selesai
- [ ] Tugas belum selesai
