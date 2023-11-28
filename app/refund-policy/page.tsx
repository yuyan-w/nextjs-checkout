import React from "react";

const page = () => {
  return (
    <main className="max-w-screen-md mx-auto bg-white">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold text-center mb-4">返金ポリシー</h2>
        <div>
          <h3 className="text-lg font-bold mt-8 mb-2">購入した記事について</h3>
          <p className="text-gray-700">
            私たちのサイトでは、提供される記事の内容に自信を持っており、各記事は購入前にお客様が十分に納得された上での購入をお願いしています。そのため、一度購入された記事に関しては、原則として返金を行っておりません。記事の品質には最大限の注意を払っておりますが、内容についてのご不満がある場合は、カスタマーサポートまでご連絡ください。
          </p>
          <h3 className="text-lg font-bold mt-8 mb-2">
            サブスクリプションについて
          </h3>
          <p className="text-gray-700">
            サブスクリプションプランの料金は、サービスの継続的な提供と維持のために設定されています。そのため、サブスクリプションを途中で解約された場合でも、すでにお支払いいただいたサブスクリプション料金の返金はいたしかねます。途中解約の場合、次回請求日までサブスクリプションサービスは引き続きご利用いただけます。次回の請求を防ぐためには、次回請求日の前にサブスクリプションのキャンセル手続きを完了していただく必要があります。
          </p>
          <h3 className="text-lg font-bold mt-8 mb-2">例外事項</h3>
          <p className="text-gray-700">
            法令により返金が義務付けられている特別な状況を除き、上記の条件に基づいた返金は行われません。例外的な事情がある場合は、カスタマーサポートまでご相談ください。
          </p>
        </div>
      </div>
    </main>
  );
};

export default page;
