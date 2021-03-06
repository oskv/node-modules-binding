# Service locator
Основная идея заключается в наличии центрального реестра для управления компонентами
системы, который выступает в качестве посредника при загрузке зависимости
любым модулем. Суть в том, что вместо жесткого связывания зависимости запрашиваются
у локатора служб.

Важно понимать, что при использовании локатора служб возникает зависимость
от него самого, что определяет уровень сцепления модулей и, следовательно, возможность
их повторного использования. В Node.js можно определять три вида локаторов
служб, в зависимости от порядка подключения к компонентам системы:
- жесткая зависимость от локатора служб;
- внедрение локатора служб;
- глобальный локатор служб.

Первый вид, естественно, предлагает минимум преимуществ с точки зрения ослабления
связей, поскольку подразумевает создание непосредственной ссылки на экземпляр
локатора служб с помощью require(). В Node.js это считается антишаблоном,
так как приводит к образованию тесной связи с компонентом, предназначенным для
ослабления связей. В этом контексте использование локатора служб не имеет особого
смысла, с точки зрения повторного использования, поскольку лишь добавляет еще
один уровень косвенности и сложности.

Иное дело – внедрение локатора служб с использованием механизма DI. Его можно
рассматривать как удобный способ внедрения всего набора зависимостей сразу.
И, как будет показано ниже, этим его преимущества не ограничиваются.

Третий способ – ссылка на локатор служб в глобальной области видимости. Он
имеет те же недостатки, что и жесткое связывание локатора служб, но, поскольку
в этом случае локатор носит глобальный характер, он является настоящим объектом-
одиночкой и, следовательно, может совместно использоваться разными пакетами как
общий экземпляр. Мы рассмотрим этот метод далее, но отметим, что в действительности
не так много причин для использования глобального локатора служб.

# Плюсы и минусы локатора служб
Шаблоны «Локатор служб» и «Внедрение зависимостей» имеют много общего: оба
передают владение зависимостями внешним, по отношению к компоненту, сущностям.
Однако подход к подключению локатора служб влияет на гибкость всей архитектуры.
Не случайно для реализации примера был выбран прием внедрения, а не
жесткая привязка или глобальный локатор служб. Применение двух последних вариантов
практически сводит на нет все преимущества этого шаблона. Фактически
в результате их использования мы просто заменим непосредственное связывание зависимостей
с помощью require() привязкой к одному конкретному экземпляру локатора
служб. Кроме того, несмотря на то что жестко привязанный локатор служб все
же обеспечит большую гибкость конфигурирования компонента, давая возможность
привязывать зависимости по их именам, это не даст никаких заметных преимуществ
с точки зрения повторного использования.

Подобно шаблону внедрения зависимостей, локатор служб затрудняет определение
взаимосвязей между компонентами, поскольку они разрешаются во время выполнения.
Вдобавок локатор служб усложняет понимание, какую именно зависимость
конкретный компонент собирается затребовать. При применении DI это выражается
гораздо более явным образом, определением зависимостей в аргументах фабрики или
конструктора. Локатор служб делает это гораздо менее очевидным способом, что требует
дополнительной проверки кода или прямого объявления в документации, какие
зависимости попытается загрузить компонент.
И наконец, следует учесть, что часто локатор служб ошибочно принимают за DI-
контейнер, поскольку они выполняют одну и ту же роль реестра служб, но делают
это по-разному. При применении локатора службы все компоненты явно загружают
свои зависимости из локатора служб. При использовании DI-контейнера компонентам
ничего неизвестно о нем.

Разница между этими двумя подходами определяется следующими признаками:
- повторное использование: компоненты, полагающиеся на локатор служб,
хуже подходят для повторного использования, поскольку требуют доступности
в системе локатора служб;
- удобочитаемость: как уже упоминалось, локатор служб усложняет определение
зависимостей, затребованных компонентом.

С точки зрения повторного использования шаблон «Локатор служб» находится
между шаблоном жестких зависимостей и DI. С точки зрения удобства и простоты он
определенно превосходит шаблон DI, требующий ручной настройки, поскольку при
его применении не придется заботиться о построении полного графа зависимостей
вручную.

В соответствии с этими утверждениями шаблон DI определенно обеспечивает наилучший
компромисс с точки зрения повторного использования компонентов и удобства
применения. Более подробно этот шаблон рассматривается в следующем разделе.