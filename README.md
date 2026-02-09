# Kumbo 🦁💰

**Kumbo**, çocuklara finansal okuryazarlık kazandırmayı hedefleyen, yapay zeka destekli ve oyunlaştırılmış bir dijital kumbaradır. 6-14 yaş arası çocuklar için tasarlanan bu uygulama, ebeveyn kontrolü altında çocukların harçlıklarını yönetmelerini, birikim hedefleri koymalarını ve paranın değerini öğrenmelerini sağlar.

## 🚀 Özellikler

### Çocuklar İçin 🧒
*   **Oyunlaştırılmış Dashboard:** Kendi karakterini ve XP seviyesini gör.
*   **Hedef Belirleme:** Hayalindeki LEGO seti veya bisiklet için birikim hedefi oluştur.
*   **Görev Tamamlama:** Ebeveynlerinin verdiği görevleri tamamla, ödül kazan (Konfeti patlat! 🎉).
*   **Kumbara:** Nakit ve dijital paranı tek bir yerden takip et.

### Ebeveynler İçin 👨‍👩‍👧‍👦
*   **Aile Yönetimi:** Tüm çocukların bakiyelerini tek ekrandan gör.
*   **Görev Atama:** "Odanı topla", "Kitap oku" gibi görevler ver ve ödül belirle.
*   **Onay Mekanizması:** Çocuğun "Yaptım" dediği görevi onayla veya reddet.
*   **Toplu Onay:** Biriken tüm görevleri tek tıkla onayla.
*   **Manuel Bakiye:** Elden verilen harçlıkları sisteme işle.
*   **Hareket Geçmişi:** Çocuğun nereye ne kadar harcadığını veya kazandığını izle.

## 🛠️ Teknolojiler

*   **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
*   **Dil:** TypeScript
*   **Veritabanı & Auth:** [Supabase](https://supabase.com/)
*   **Stil:** Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/)
*   **State Management:** Zustand
*   **İkonlar:** Lucide React

## 📦 Kurulum

Projeyi yerel ortamınızda çalıştırmak için:

1.  Depoyu klonlayın:
    ```bash
    git clone https://github.com/kullaniciadi/kumbo.git
    cd kumbo
    ```

2.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

3.  Çevresel değişkenleri ayarlayın:
    *   `.env.local` dosyası oluşturun ve Supabase anahtarlarınızı ekleyin:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
    ```

4.  Uygulamayı başlatın:
    ```bash
    npm run dev
    ```

## 🏗️ Build

Prodüksiyon sürümü almak için:

```bash
npm run build
```

---
**Product Forge** süreci ile geliştirilmiştir.
